import asyncio
import websockets
from pydantic_ai import Agent
from dotenv import load_dotenv
import os

load_dotenv()
os.makedirs("logs", exist_ok=True)

evaluator_agent = Agent(
    'google-gla:gemini-1.5-flash',
    system_prompt="""
Ты опытный преподаватель и эксперт по оценке эссе. 
Проанализируй предоставленное эссе по следующим критериям:

1. **Структура и организация** (0-25 баллов)
   - Логичность построения
   - Наличие введения, основной части, заключения
   - Переходы между абзацами

2. **Содержание и аргументация** (0-25 баллов)
   - Глубина раскрытия темы
   - Качество аргументов и примеров
   - Соответствие теме

3. **Стиль и язык** (0-25 баллов)
   - Ясность изложения
   - Богатство лексики
   - Грамматическая правильность

4. **Оригинальность и креативность** (0-25 баллов)
   - Нестандартный подход
   - Интересные идеи и выводы

Формат ответа:
# 📝 ОЦЕНКА ЭССЕ

## 🎯 Тема: [тема эссе]

## 📊 Детальная оценка:

### Структура и организация: X/25
[комментарий]

### Содержание и аргументация: X/25  
[комментарий]

### Стиль и язык: X/25
[комментарий]

### Оригинальность и креативность: X/25
[комментарий]

## 🎖️ ИТОГОВАЯ ОЦЕНКА: X/100

## ✅ Сильные стороны:
- [пункт 1]
- [пункт 2]

## 🔧 Рекомендации по улучшению:
- [пункт 1]
- [пункт 2]

## 📝 Общий комментарий:
[общая оценка и впечатления]

Будь конструктивным и объективным в оценке.
"""
)

async def evaluate_essay(essay_data):
    return await evaluator_agent.run(essay_data)

async def essay_evaluator_agent():
    async with websockets.connect("ws://localhost:8765") as ws:
        await ws.send("register:essay_evaluator")
        
        while True:
            essay_data = await ws.recv()
            print(f"[Essay Evaluator] Получено эссе для оценки")
            
            # Извлекаем тему и эссе
            lines = essay_data.split('\n')
            topic = lines[0].replace('TOPIC: ', '') if lines[0].startswith('TOPIC: ') else "Не указана"
            essay_start = essay_data.find('ESSAY:\n') + 7
            essay_content = essay_data[essay_start:] if essay_start > 6 else essay_data
            
            print(f"[Essay Evaluator] Тема: {topic}")
            print(f"[Essay Evaluator] Длина эссе: {len(essay_content)} символов")
            
            try:
                # Получаем оценку
                evaluation = await evaluate_essay(essay_data)
                evaluation_text = evaluation.output
                
                # Ограничиваем размер если необходимо
                if len(evaluation_text) > 2000:
                    evaluation_text = evaluation_text[:1900] + "\n\n⚠️ Оценка сокращена для отображения."
                
                print(f"[Essay Evaluator] Оценка готова, отправка пользователю...")
                
                # Отправляем оценку пользователю
                await ws.send(f"send:user:{evaluation_text}")
                
                # Логируем в файл
                with open("logs/essay_evaluations.log", "a", encoding="utf-8") as f:
                    f.write(f"\n{'='*50}\n")
                    f.write(f"ТЕМА: {topic}\n")
                    f.write(f"ДАТА: {asyncio.get_event_loop().time()}\n")
                    f.write(f"\nЭССЕ:\n{essay_content}\n")
                    f.write(f"\nОЦЕНКА:\n{evaluation_text}\n")
                    f.write(f"{'='*50}\n")
                
            except Exception as e:
                error_msg = f"Ошибка при оценке эссе: {str(e)}"
                print(f"[Essay Evaluator] {error_msg}")
                await ws.send(f"send:user:{error_msg}")

if __name__ == "__main__":
    asyncio.run(essay_evaluator_agent())