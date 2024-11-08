
import { TextOutlinePane } from "../../components/text-outline-pane/text-outline-pane.component"
import "./main.view.scss"
import { Navigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setActiveProject } from "../../app/ui.slice/ui.slice.async";
import { AppDispatch } from "../../app/store";
import { getActiveProject, getDocumentDrawerState, getRawDrawerState } from "../../app/ui.slice/ui.slice.selectors";
import { Badge, Button, Drawer } from "antd";
import { ProjectUpdateForm } from "../../components/project-update-form/project-update-form.component";
import { FileOutlined, SettingOutlined } from "@ant-design/icons";
import { RawTextView } from "../../components/raw-text-view/raw-text-view.component";
import { setDocumentDrawerOpen, setRawDrawerOpen } from "../../app/ui.slice/ui.slice";

export function MainView() {
    const { id: activeProjectId } = useParams();
    const dispatch = useDispatch<AppDispatch>()
    const activeProject = useSelector(getActiveProject)
    const documentDrawerOpen = useSelector(getDocumentDrawerState)
    const rawDrawerOpen = useSelector(getRawDrawerState)

    useEffect(
        () => {
            if (!!activeProjectId) dispatch(setActiveProject(activeProjectId))
        }, []
    )

    return (
        <div className="mainView">
            {!activeProjectId ? <Navigate to={"/"}></Navigate> : ""}
            <div className="mainViewHeader">
                <div className="headerElements">
                    <div className="buttons">
                        <Button icon={<Badge dot={!activeProject?.description}><SettingOutlined /></Badge>} onClick={() => setDocumentDrawerOpen(true)} type="text" shape="round" />
                        <Button icon={<FileOutlined />} onClick={() => dispatch(setRawDrawerOpen(true))} type="text" shape="round" /></div>
                </div>
            </div>
            <Drawer size="large" open={rawDrawerOpen} title={activeProject ? activeProject.name : ""} onClose={() => dispatch(setRawDrawerOpen(false))}>
                {activeProjectId ? <RawTextView></RawTextView> : ""}
            </Drawer>
            {
                !!activeProject ?
                    <Drawer open={documentDrawerOpen} onClose={() => dispatch(setDocumentDrawerOpen(false))} placement="left" size="large" title={activeProject.name}>
                        <ProjectUpdateForm project={activeProject}></ProjectUpdateForm>
                    </Drawer> : ""
            }
            <div className="contentPane">
                <TextOutlinePane />
                {/* <EditorPaneComponent></EditorPaneComponent> */}
            </div>
        </div >)
}