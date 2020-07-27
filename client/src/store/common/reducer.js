import {commonActions} from './actions';

export const CommonState = () => ({
    avatarFile: {},   
    imageFiles: [],
    respStatus: '',
    error: '',    
});

export function CommonReducer (state = new CommonState(), {payload, type}){
    switch(type){
        case commonActions.UPLOAD_FILE_FULLFILED:
            return {
                ...state,
                avatarFile: payload.avatarFile.files[0]
            }
        case commonActions.UPLOAD_IMAGES_FULLFILED:
            return {
                ...state,
                imageFiles: payload.imageFiles.files
            }
        case commonActions.REMOVE_IMAGE:
            return {
                ...state,
                imageFiles: state.imageFiles.filter(item => item.key !== payload.file.key)
            }
        case commonActions.COMMON_ERROR:
            return {
                ...state,
                error: payload.error.data.error
            }
        case commonActions.CLEAR_COMMON_ERROR:
            return {
                ...state,                
                error: '',  
                respStatus: ''  
            }
        case commonActions.REMOVE_IMAGE_FULLFILED:
            return {
                ...state,                
                respStatus: 'success',    
            }
        default:
            return {
                ...state
            }
        }

}