//instead of simple true/false boolean values we return an object in each case,
//  for success:success and data or error message in case of failure
export const ok = (data) => ({
    success: true,
    data,
});
export const err = (error) => ({
    success: false, error
});
//# sourceMappingURL=result.helpers.js.map