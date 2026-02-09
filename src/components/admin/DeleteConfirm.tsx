'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface DeleteConfirmProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  loading?: boolean;
}

export function DeleteConfirm({ open, onClose, onConfirm, title, loading }: DeleteConfirmProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <ExclamationTriangleIcon className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <Dialog.Title className="text-lg font-display font-semibold text-brand-black">
                      Delete Product
                    </Dialog.Title>
                    <p className="mt-2 text-sm font-body text-brand-gray-500">
                      Are you sure you want to delete <strong>{title}</strong>? This action
                      cannot be undone and the product will be removed from the storefront
                      immediately.
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-body font-medium text-brand-gray-600 hover:text-brand-black transition-colors"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={loading}
                    className="px-4 py-2 text-sm font-body font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Deleting...' : 'Delete Product'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
