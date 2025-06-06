from dotenv import load_dotenv
load_dotenv()

from langchain_openai import ChatOpenAI
import asyncio
import websockets
import os

async def essay_generator_agent():
    while True:
        try:
            # Подключение с увеличенными таймаутами
            async with websockets.connect(
                "ws://localhost:8765",
                ping_interval=20,
                ping_timeout=10,
                close_timeout=10
            ) as ws:
                await ws.send("register:essay_generator")
                print("[Essay Generator] Успешно подключен и зарегистрирован")
                
                while True:
                    try:
                        topic = await ws.recv()
                        print(f"[Essay Generator] Получена тема: {topic}")
                        
                        # Инициализация модели
                        llm = ChatOpenAI(model="gpt-4", temperature=0.7)
                        
                        # Промпт для генерации эссе
                        prompt = f"""
Напиши эссе на тему: "{topic}"

Требования к эссе:
- Объем: 400-600 слов
- Структура: введение, основная часть (2-3 абзаца), заключение
- Стиль: академический, но доступный
- Включи примеры и аргументы
- Используй четкие переходы между абзацами

Тема: {topic}
"""
                        
                        try:
                            essay = llm.invoke(prompt)
                            essay_content = essay.content
                            
                            print(f"[Essay Generator] Эссе готово, отправка на оценку...")
                            print(f"[Essay Generator] Предварительный просмотр:\n{essay_content[:200]}...")
                            
                            # Создаем структурированное сообщение для оценщика
                            message_to_evaluator = f"TOPIC: {topic}\n\nESSAY:\n{essay_content}"
                            await ws.send(f"send:essay_evaluator:{message_to_evaluator}")
                            
                        except Exception as e:
                            error_msg = f"Ошибка при генерации эссе: {str(e)}"
                            print(f"[Essay Generator] {error_msg}")
                            await ws.send(f"send:user:{error_msg}")
                            
                    except websockets.exceptions.ConnectionClosed:
                        print("[Essay Generator] Соединение закрыто, попытка переподключения...")
                        break
                    except Exception as e:
                        print(f"[Essay Generator] Ошибка при обработке сообщения: {e}")
                        await asyncio.sleep(1)
                        
        except Exception as e:
            print(f"[Essay Generator] Ошибка подключения: {e}")
            print("[Essay Generator] Переподключение через 5 секунд...")
            await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(essay_generator_agent())