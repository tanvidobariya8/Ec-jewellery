import { Container } from "@/components/ui/Container";

import { CurrencySwitcher } from "@/components/layout/CurrencySwitcher";
import { HeaderActions } from "@/components/layout/HeaderActions";
import { Logo } from "@/components/layout/Logo";
import { MainNav } from "@/components/layout/MainNav";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
      <Container>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center py-3 md:py-5">
          <div className="flex items-center">
            <MobileMenu />
            <CurrencySwitcher className="max-md:hidden" />
          </div>
          <Logo priority />
          <HeaderActions className="justify-end" />
        </div>
        <MainNav />
      </Container>
    </header>
  );
}
