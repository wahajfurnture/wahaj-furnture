import { Box, Container, Flex } from "@radix-ui/themes";
import MobileMenu from "./MobileMenu";
import ChangeLangSelect from "./ChangeLangSelect";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";

function Header() {
  const t = useTranslations("nav");
  const links = [
    { text: t("home"), href: "/" },
    { text: t("aboutUs"), href: "/about-us" },
    { text: t("contactUs"), href: "/contact-us" },
    { text: t("sofas"), href: "/category/sofa" },
    { text: t("curtains"), href: "/category/curtain" },
  ];
  return (
    <header className="shadow-md border-b border-gray-200">
      <Container className="py-3 px-4">
        <Flex justify={"between"} align={"center"}>
          <Box>
            <Link href="/">
              <Image
                width={35}
                height={35}
                src={"/Wahaaj-logo-removebg.png"}
                alt="Website's Logo"
              />
            </Link>
          </Box>
          <Flex gap="3" align="center">
            <Flex
              gap="4"
              align="center"
              display={{
                md: "none",
                initial: "none",
                sm: "none",
                xs: "none",
                lg: "flex",
                xl: "flex",
              }}
            >
              {links.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  className="hover:text-gray-700 font-bold duration-300 hover:underline"
                  prefetch
                >
                  {link.text}
                </Link>
              ))}
            </Flex>

            <MobileMenu />
            <ChangeLangSelect />
          </Flex>
        </Flex>
      </Container>
    </header>
  );
}

export default Header;
