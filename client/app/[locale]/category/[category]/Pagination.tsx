"use client";

import { Button, Flex } from "@radix-ui/themes";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter, Link } from "@/i18n/navigation";

import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

interface PaginationTypes {
  count: number;
}

export default function Pagination({ count }: PaginationTypes) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.max(1, count || 0);

  let start = currentPage - 2;
  let end = currentPage + 2;

  if (start < 1) {
    start = 1;
    end = Math.min(start + 4, totalPages);
  }

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - 4, 1);
  }

  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  );

  const makeHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `?${params.toString()}`;
  };

  return (
    <Flex align="center" justify="center" gap="2" mt="6" className="flex-wrap">
      <Button
        disabled={currentPage <= 1}
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          const page = Number(params.get("page")) || 1;
          params.set("page", String(Math.max(1, page - 1)));
          router.push(`${pathname}?${params.toString()}`);
        }}
        className="cursor-pointer"
      >
        <BiLeftArrowAlt />
      </Button>
      <Flex gap={"2"} asChild>
        <ul>
          {pageNumbers.map((page) => (
            <li key={page}>
              <Button
                disabled={(Number(searchParams.get("page")) || 1) === page}
                asChild
              >
                <Link href={makeHref(page)}>{page}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </Flex>

      <Button
        onClick={() => {
          const params = new URLSearchParams(searchParams.toString());
          const page = Number(params.get("page")) || 1;
          params.set("page", String(Math.min(totalPages, page + 1)));
          router.push(`${pathname}?${params.toString()}`);
        }}
        className="cursor-pointer"
        disabled={currentPage >= totalPages}
      >
        <BiRightArrowAlt />
      </Button>
    </Flex>
  );
}
