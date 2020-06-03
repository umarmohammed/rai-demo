export function fileToFormData(props: { file: File }) {
  const formData = new FormData();
  formData.append('file', props.file);
  return formData;
}
