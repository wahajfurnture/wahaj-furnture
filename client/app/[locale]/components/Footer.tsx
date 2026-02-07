import { Box, Text } from "@radix-ui/themes";
import { Link } from "@/i18n/navigation";

function footer() {
  return (
    <Box className="bg-(--accent-9) text-white py-8 text-center text-sm">
      <Text as="p">
        © {new Date().getFullYear()} All rights reserved. |{" "}
        <Link
          href="/login"
          //   className="text-gray-700 hover:text-gray-700 no-underline cursor-pointer transition-opacity hover:opacity-75"
        >
          Wahaj
        </Link>
      </Text>
    </Box>
  );
}

export default footer;
