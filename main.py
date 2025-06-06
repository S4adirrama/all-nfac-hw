import asyncio
import websockets

clients = {}

async def handler(websocket):
    try:
        async for message in websocket:
            print(f"[Server] Received: {message}")
            
            if message.startswith("register:"):
                name = message.split(":", 1)[1]
                clients[name] = websocket
                print(f"[Server] {name} зарегистрирован.")
                
            elif message.startswith("send:"):
                parts = message.split(":", 2)
                if len(parts) < 3:
                    print("[Server] Неправильный формат сообщения.")
                    continue
                    
                _, to, content = parts
                if to in clients:
                    await clients[to].send(content)
                    print(f"[Server] Передано → {to}")
                else:
                    print(f"[Server] Агент {to} не найден.")
                    
    except Exception as e:
        print(f"[Server] Ошибка: {e}")

async def user():
    async with websockets.connect("ws://localhost:8765") as ws:
        await ws.send("register:user")
        topic = input("📝 Введите тему для эссе: ")
        await ws.send(f"send:essay_generator:{topic}")
        
        evaluation = await ws.recv()
        print(f"\n📋 Результат оценки эссе:\n{evaluation}")

async def main():
    async with websockets.serve(handler, "localhost", 8765):
        print("✅ WebSocket-сервер запущен на ws://localhost:8765")
        print("Запустите агентов в отдельных терминалах:")
        print("python essay_generator.py")
        print("python essay_evaluator.py")
        print("\nДля запуска пользователя:")
        print("python -c \"import main; import asyncio; asyncio.run(main.user())\"")
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())