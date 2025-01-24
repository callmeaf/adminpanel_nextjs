"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Link as I18nLink } from "@/i18n/routing";

/**
 * A custom Link component that wraps Next.js's next/link component.
 */
export function Link({ href, children, replace, ...rest }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  if (isPending) {
    return <>Pending navigation</>;
  }

  return (
    <I18nLink
      href={href}
      onClick={(e) => {
        e.preventDefault();
        startTransition(() => {
          const url = href.toString();
          if (replace) {
            router.replace(url);
          } else {
            router.push(url);
          }
        });
      }}
      {...rest}
    >
      {children}
    </I18nLink>
  );
}
