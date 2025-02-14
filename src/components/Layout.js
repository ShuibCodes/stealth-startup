import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Chatbot } from "./Chatbot";

export const metadata = {
  title: "Analytics Dashboard with ChatGPT",
  description:
    "A powerful analytics dashboard with integrated ChatGPT assistant",
};

export default function RootLayout({ children }) {
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            {children}
          </main>
        </div>
      </div>
      <Chatbot />
    </>
  );
}
