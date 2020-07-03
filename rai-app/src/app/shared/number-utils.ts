export function gridNumberFormatter(params: any) {
  return params.value % 1 === 0 ? params.value : params.value.toFixed(4);
}
