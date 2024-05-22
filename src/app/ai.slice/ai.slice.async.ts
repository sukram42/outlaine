import { createAsyncThunk } from "@reduxjs/toolkit";
import { ItemV2, supabase } from "../supabaseClient";
import { updateItemTextV2 } from "../items.slice/item.slice";


export const outline2textCompletion = createAsyncThunk(
    "ui/testEdgeFunctions",
    async (payload: { paragraph: ItemV2, project_id: string }, thunkAPI) => {

        // thunkAPI.dispatch(setParagraphToLoad(payload.paragraph.item_id))

        const { data } = await supabase.functions.invoke('mistral', {
            body: { paragraph: payload.paragraph.item_id, project_id: payload.project_id },
        })

        thunkAPI.dispatch(updateItemTextV2({
            field: "final",
            item: payload.paragraph,
            newText: data.result
        }))
        // thunkAPI.dispatch(rmParagraphFromLoading(payload.paragraph.item_id))
        // Update the data
    }
)