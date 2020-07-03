import { createAction, props } from '@ngrx/store';

export const inlineItemSelected = createAction(
  '[Adversarial Pages] Inline Item Selected',
  props<{ selectedInlineId: number }>()
);

export const borderlineItemSelected = createAction(
  '[Adversarial Page] Bordeline Item Selected',
  props<{ selectedBorderlineId: number }>()
);
