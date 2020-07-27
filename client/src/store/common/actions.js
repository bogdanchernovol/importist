export const commonActions = {
    REQUEST: 'REQUEST',   
    RESPONSE: 'RESPONSE',
    REJECT: 'REJECT',
    UPLOAD_FILE_FULLFILED: 'UPLOAD_FILE_FULLFILED',
    COMMON_ERROR: 'COMMON_ERROR',
    CLEAR_COMMON_ERROR: 'CLEAR_COMMON_ERROR',
    UPLOAD_IMAGES_FULLFILED: 'UPLOAD_IMAGES_FULLFILED',
    REMOVE_IMAGE_FULLFILED: 'REMOVE_IMAGE_FULLFILED',
    REMOVE_IMAGE: 'REMOVE_IMAGE',

    uploadFile: file =>({
        type: commonActions.REQUEST,
        payload: {
            data: file,
            method: 'post',
            url: '/api/common/uploadFile',
            sucess: commonActions.uploadFileFulfilled,
            error: commonActions.error
        }
    }),
    uploadImages: files =>({
        type: commonActions.REQUEST,
        payload: {
            data: files,
            method: 'post',
            url: '/api/common/uploadFile',
            sucess: commonActions.uploadImagesFulfilled,
            error: commonActions.error
        }
    }),
    removeImageFromS3: file=>({
        type: commonActions.REQUEST,
        payload: {
            data: {file},
            method: 'post',
            url: '/api/common/deleteFile',
            sucess: commonActions.removeImageFulfilled,
            error: commonActions.error
        }
    }),
    removeImage: file => ({
        type: commonActions.REMOVE_IMAGE,
        payload: {file}
    }),
    uploadFileFulfilled: (avatarFile) => ({
        type: commonActions.UPLOAD_FILE_FULLFILED,
        payload: {avatarFile}
    }),
    uploadImagesFulfilled: (imageFiles) => ({
        type: commonActions.UPLOAD_IMAGES_FULLFILED,
        payload: {imageFiles}
    }),
    removeImageFulfilled: () => ({
        type: commonActions.REMOVE_IMAGE_FULLFILED        
    }),
    error: error => ({
        type: commonActions.COMMON_ERROR,
        payload: {error}
    }),
    clearError: ()=>({
        type: commonActions.CLEAR_COMMON_ERROR
    }),
}