from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from autogen import ConversableAgent, UserProxyAgent
from pydantic import BaseModel
from typing import Optional
from uuid import UUID, uuid4

app = FastAPI()

# Add CORSMiddleware to allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Allow React frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# LLM configuration (replace with your specific model configuration)
llm_config = {
    "model": "llama3-70b-8192",
    "api_key": "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",  # Replace with your actual API key
    "api_type": "groq",
    "cache_seed": None
}

# Input model for challenge generation
class UserInput(BaseModel):
    id: Optional[UUID] = None
    feeling: str
    response: Optional[dict] = None  # Store the structured response as a dictionary

# Endpoint to generate a challenge
@app.post("/feeler", response_model=UserInput)
async def generate_response(input: UserInput):
    input.id = uuid4()

    proxy = UserProxyAgent(
        name="proxy",
        system_message="Context: You are an empathetic, supportive assistant designed to listen to and understand how the user is feeling. You take into account both their current emotional state and any specific requests or questions they may have. Your primary goal is to respond in a way that both acknowledges their feelings and provides thoughtful, personalized advice or comfort, depending on the context. Instructions for the Agent: Emotion Recognition: Start by acknowledging the user’s emotions, using supportive language that shows understanding. Empathy First: Provide a brief empathetic statement that reflects their emotional state. Advice/Guidance: If the user has specific requests or questions, offer helpful, practical advice tailored to their needs. Ensure that the advice is sensitive to their emotions. Encouragement and Positivity: End the response with encouragement or comforting words that can help uplift their mood, no matter the topic.",
        llm_config=llm_config,
        code_execution_config=False,
        human_input_mode="ALWAYS"
    )

    generator = ConversableAgent(
        name="generator",
        system_message="Context: You are an empathetic, supportive assistant designed to listen to and understand how the user is feeling. You take into account both their current emotional state and any specific requests or questions they may have. Your primary goal is to respond in a way that both acknowledges their feelings and provides thoughtful, personalized advice or comfort, depending on the context.",
        llm_config=llm_config,
        code_execution_config=False,
        human_input_mode="NEVER",
    )

    # Getting response from the agent based on the user's feeling
    challenge_response = proxy.initiate_chat(generator, message=f"{input.feeling}", max_turns=1)
    print("Raw response from agent:", challenge_response.chat_history[-1]["content"])

    # Parse the raw response here
    response_text = challenge_response.chat_history[-1]["content"]
    # Log the raw text response for debugging purposes
    print("Raw response content:", response_text)

    # Split the response into empathy, advice, and encouragement
    sections = response_text.split("\n\n")
    
    empathy = sections[0] if len(sections) > 0 else "Empathy part not found."
    advice = sections[1] if len(sections) > 1 else "Advice part not found."
    encouragement = sections[2] if len(sections) > 2 else "Encouragement part not found."

    # Structure the response
    input.response = {
        "empathy": empathy,
        "advice": advice,
        "encouragement": encouragement
    }
## Eng.moamen's remarks: Lowering the temperature to ZERO will descope the response for more reliability in response structure. try "REQUIRED" reference the nlp/nlg/generated_idea 
    return input

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8880)
