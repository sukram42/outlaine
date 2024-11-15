

import { useDispatch, useSelector } from "react-redux"
import "./project.view.scss"
import { AppDispatch } from "../../app/store"
import { List, Skeleton, Button, Drawer } from "antd"
import { createProject, deleteProject, loadProjects } from "../../app/ui.slice/ui.slice.async"
import { getActiveProjectId, getAreProjectsLoading, getProjects } from "../../app/ui.slice/ui.slice.selectors"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { EditOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons"
import { NewProjectFormValues } from "../../components/new-project-form/new-project-form.interface"
import { NewProjectForm } from "../../components/new-project-form/new-project-form.component"
import { Project } from "../../app/supabaseClient"
import { ProjectInfo } from "../../components/project-info/project-info.component"
import { setShowSidebar } from "../../app/ui.slice/ui.slice"

export function ProjectView() {

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)

    const activeProject = useSelector(getActiveProjectId)
    const projects = useSelector(getProjects)
    const areProjectsLoading = useSelector(getAreProjectsLoading)

    const [isNewProjectDrawerOpen, setNewProjectDrawerOpenState] = useState(false)
    const [activeProjectInfo, setActiveProjectInfo] = useState<Project | null>(null)

    useEffect(() => {
        dispatch(setShowSidebar(false))
        dispatch(loadProjects())
    }, []);

    const createProjectFinish = (values: NewProjectFormValues) => {

        if(!values.name) {
            values = {...values, name: "New Unnamed Project" }
        }
        setNewProjectDrawerOpenState(false)
        setLoading(true)

        let a = dispatch(createProject(values))
        a.then((a) => {
            setLoading(false)
            navigate(`/project/${a.payload.project_id}`)
        })
    }

    return (
        <div className="projectView">
            <Drawer title="Basic Drawer" size={"large"} onClose={() => setNewProjectDrawerOpenState(false)} open={isNewProjectDrawerOpen}>
                <NewProjectForm onFinish={createProjectFinish} />
            </Drawer>
            <Drawer size={"large"}
                title="Project Overview"
                open={!!activeProjectInfo}
                onClose={() => setActiveProjectInfo(null)}>
                {
                    !!activeProjectInfo ? <ProjectInfo onDelete={() => {
                        dispatch(deleteProject(activeProjectInfo.project_id))
                        setActiveProjectInfo(null)
                    }} project={activeProjectInfo!}></ProjectInfo> : ""}
            </Drawer>

            <div className="projectToolbar">
                <Button icon={<PlusOutlined />} onClick={() => setNewProjectDrawerOpenState(true)} size="large" type="primary"> Project </Button>
            </div>

            {activeProject ? <Navigate to={`/project/${activeProject}`}></Navigate> : ""}
            <div className="projectList">
                <List
                    className="projectList"
                    itemLayout="horizontal"
                    dataSource={projects}
                    loading={areProjectsLoading || loading}
                    renderItem={(item) => (
                        <List.Item
                            actions={[
                                <Button key="list-loadmore-edit" icon={<EditOutlined />} href={`#/project/${item.project_id}`}></Button>,
                                <Button key="info" type="text" icon={<MoreOutlined />} onClick={() => setActiveProjectInfo(item)}></Button>]
                            }
                        >
                            <Skeleton avatar title={false} loading={areProjectsLoading} active>
                                <List.Item.Meta
                                    // avatar={<Avatar src={item.picture.large} />}
                                    title={<a href={`#/project/${item.project_id}`}>{item.name}</a>}
                                    description={item.description}
                                />

                            </Skeleton>
                        </List.Item>
                    )}
                /></div>
        </div >)
}