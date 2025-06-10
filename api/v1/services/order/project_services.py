from bson import ObjectId
from typing import List, Optional
from fastapi import HTTPException
from database import DataBase
from api.v1.schema.order.project_schema import ProjectInDB, ProjectCreate, ProjectUpdate

class ProjectService:
    def __init__(self, db: DataBase):
        self.db = db
        if self.db.projects is None:
            raise OrderException.DatabaseError("Projects collection not initialized")

    async def create_project(self, project_data: ProjectCreate) -> ProjectInDB:
        try:
            project_dict = project_data.dict()
            result = await self.db.projects.insert_one(project_dict)
            project_dict["_id"] = result.inserted_id
            return ProjectInDB(**project_dict, id=str(result.inserted_id))
        except Exception as e:
            raise OrderException.DatabaseError(f"Error creating project: {str(e)}")

    async def update_project(self, project_id: str, update_data: ProjectUpdate) -> ProjectInDB:
        try:
            update_dict = {k: v for k, v in update_data.dict().items() if v is not None}
            result = await self.db.projects.update_one(
                {"_id": ObjectId(project_id)},
                {"$set": update_dict}
            )
            if result.matched_count == 0:
                raise OrderException.ItemNotFound(f"Project with id {project_id} not found")
            updated = await self.db.projects.find_one({"_id": ObjectId(project_id)})
            return ProjectInDB(**updated, id=str(updated["_id"]))
        except Exception as e:
            raise OrderException.DatabaseError(f"Error updating project: {str(e)}")

