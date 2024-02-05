// Helper function to handle errors
export function ErrorMessage(error: unknown, attemptedAction: string) {
  if (error instanceof Error) {
    throw new Error(
      `Error occured while \n${attemptedAction}\n \n ${error.message} \n`,
    );
  } else {
    throw new Error("An unknown error occurred");
  }
}
