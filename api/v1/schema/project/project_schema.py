from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from datetime import datetime

class ProjectCreate(BaseModel):
    user_id: str
    project_id: str
    songs: Optional[str | int] = None

class ProjectUpdate(BaseModel):
    songs: Optional[str | int] = None

class ProjectInDB(Project):
    id: str

class Project(BaseModel):
    user_id: str
    project_id: str
    songs: Optional[str | int] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)


