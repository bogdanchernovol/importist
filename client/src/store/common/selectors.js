import { createSelector } from 'reselect';

function getAvatarFileFromState(state){
    return state.common.avatarFile;
}

export const getAvatarFile = createSelector(getAvatarFileFromState, (file)=> file);

function getImageFilesFromState(state){
    return state.common.imageFiles;
}

export const getImageFiles = createSelector(getImageFilesFromState, (files)=> files);