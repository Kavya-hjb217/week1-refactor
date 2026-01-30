

//instead of simple true/false boolean values we return an object in each case,
//  for success:success and data or error message in case of failure
        
export type Result<T, E=string> =
  | { success: true; data: T }
  | { success: false; error: E };

 export const ok = <T>(data: T): Result<T, never> => ({
    success: true,
    data,
  });


 export const err = <E>(error: E): Result<never, E> => ({
    success: false, error});