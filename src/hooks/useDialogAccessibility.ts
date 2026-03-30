import { useId } from 'react';

function useDialogAccessibility(withDescription = false) {
  const labelledBy = useId();
  const describedBy = useId();

  return {
    labelledBy,
    describedBy: withDescription ? describedBy : undefined,
  };
}

export default useDialogAccessibility;
