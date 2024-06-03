import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

export default function Loading() {
    const {isLoading} = useSelector(state=>state.LoadingReducer);
    return (
        <Fragment>
            {isLoading ? (
                <div
                    className='z-50'
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, .5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 99,
                        cursor: 'no-drop',

                    }}
                >
                    <img
                        className='h-10 w-10 sm:h-20 sm:w-20 md:h-30 md:w-30 lg:h-40 lg:w-40'
                        src={require('./loading.gif')}
                    />
                </div>
            ) : (
                ''
            )}
        </Fragment>
    );
}