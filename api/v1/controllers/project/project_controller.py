from fastapi import APIRouter, Depends
from typing import List
from database import get_database, DataBase
from api.v1.schema.order.project_schema import ProjectInDB
from api.v1.services.order.project_services import ProjectService
router = APIRouter()

@router.post("/projects/", response_model=ProjectInDB)
async def create_project(
    project: ProjectInDB,
    db: DataBase = Depends(get_database)
):
    return await ProjectService(db).create_project(project)

@router.put("/projects/{project_id}", response_model=ProjectInDB)
async def update_project(
    project_id: int,
    project: ProjectInDB,
    db: DataBase = Depends(get_database)
):
    return await ProjectService(db).update_project(project_id, project)
