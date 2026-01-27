import Header from "@/app/ui/branded-solution/header";
import Footer from "@/app/ui/branded-solution/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
