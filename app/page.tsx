import { ResearchAssistant } from "@/components/research-assistant"

export default function Home() {
  // In a real app, you would check if the user is authenticated
  // If not, redirect to the login page
  // const session = await getSession();
  // if (!session) {
  //   redirect("/auth/login");
  // }

  // For demo purposes, we'll just render the ResearchAssistant
  return <ResearchAssistant />
}

