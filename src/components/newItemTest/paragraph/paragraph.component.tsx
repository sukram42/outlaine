
import "./paragraph.component.scss"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { ItemSideComponent } from "../../itemSide/item-side.component";
import { ItemProps } from "../item/item.interface";
import { ItemV2 } from "../../../app/supabaseClient";
import { updateItemTextV2Async } from "../../../app/items.slice/item.slice.async";
import { updateItemTextV2 } from "../../../app/items.slice/item.slice";
import { outline2textCompletion } from "../../../app/ai.slice/ai.slice.async";
import { getActiveEditingSide, getLoadingItems } from "../../../app/items.slice/item.slice.selectors";


export function Paragraph(props: ItemProps) {

    const dispatch = useDispatch<AppDispatch>()

    const loadingItems = useSelector(getLoadingItems)

    const commitChange = (item: ItemV2, type: "outline" | "final", newText: string) => {
        // TODO check the indexing here
        if (type == "outline" && (item[type] || "").length > 20) {
            dispatch(outline2textCompletion({ paragraph: props.item, project_id: props.item.project_id! }))
        }
        dispatch(updateItemTextV2Async({ item: props.item, newText, field: type }))
    }

    const changeText = (item: ItemV2, type: "outline" | "final", newText: string) => {
        dispatch(updateItemTextV2({ item, newText, field: type }))
    }

    const regenerate = (type: "outline" | "final") => {
        if (type == "final") {
            dispatch(outline2textCompletion({ paragraph: props.item, project_id: props.item.project_id! }))
        }
    }
    const activeEditingSide = useSelector(getActiveEditingSide)

    return (
        <div >
            <div className="chapterComponent">
                <div>
                    <div className="doubleSide">
                        <ItemSideComponent
                            autofocus={activeEditingSide==="outline"}
                            placeholder="This is the right place to write the outline in bullet points!"
                            item={props.item}
                            final={false}
                            onCommitChange={(item: ItemV2, newText: string) => { commitChange(item, "outline", newText); }}
                            onChange={(item: ItemV2, newText: string) => { changeText(item, "outline", newText); }}
                            onNewItem={() => { props.index && props.onNew && props.onNew(props.index) }}
                            onDelete={props.onDelete!}
                            loading={false} />

                        <ItemSideComponent
                            autofocus={activeEditingSide==="final"}
                            placeholder="<- Start writing the outline on he left to generate the final text!"
                            item={props.item}
                            final={true}
                            onRegenerate={() => regenerate("final")}
                            onCommitChange={(item: ItemV2, newText: string) => { commitChange(item, "final", newText); }}
                            onNewItem={() => { props.index && props.onNew && props.onNew(props.index) }}
                            onChange={(item: ItemV2, newText: string) => { changeText(item, "final", newText); }}
                            onDelete={props.onDelete!}
                            loading={loadingItems.has(props.item.item_id)} />
                    </div>
                </div>
            </div>
        </div>
    )
}