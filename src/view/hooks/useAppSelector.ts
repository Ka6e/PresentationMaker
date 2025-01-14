import { TypedUseSelectorHook, useSelector } from "react-redux";
import { editorReducer } from "../../store/redux/reducers/editorReducer";

type RootState = ReturnType<typeof editorReducer>

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export {
    useAppSelector,
}