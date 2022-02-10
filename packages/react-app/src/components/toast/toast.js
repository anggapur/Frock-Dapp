import React from 'react';
import toast from 'react-hot-toast';

import './toast-style.scss';
import styles from './toast.module.scss';

export const ToastSuccess = text => {
  toast.success(text, {
    className: 'toast-style',
    style: {
      backgroundColor: 'green',
      color: 'white',
    },
    iconTheme: {
      primary: 'white',
      secondary: 'green',
    },
  });
};

export const ToastError = text => {
  toast.error(text, {
    className: 'toast-style',
    style: {
      backgroundColor: 'red',
      color: 'white',
    },
    iconTheme: {
      primary: 'white',
      secondary: 'red',
    },
  });
};

export const ToastConfirm = ({
  description,
  textSubmit,
  onSubmit,
  textCancel = 'Dismiss',
}) => {
  toast(t => (
    <div className={styles.confirmWrapper}>
      <p>{description}</p>
      <div className="text-end">
        <button
          type="button"
          className="btn btn-sm btn-light me-2"
          onClick={() => toast.dismiss(t.id)}
        >
          {textCancel}
        </button>
        <button
          type="button"
          className="btn btn-sm btn-success"
          onClick={async () => {
            await onSubmit();
            toast.dismiss(t.id);
          }}
        >
          {textSubmit}
        </button>
      </div>
    </div>
  ));
};
