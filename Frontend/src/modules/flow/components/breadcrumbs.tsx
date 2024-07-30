import { Link } from '@tanstack/react-router';
import { Breadcrumb as BreadcrumbBase, BreadcrumbItem, Dropdown, DropdownItem } from 'flowbite-react';
import { useBoardPath } from '../flow.store';

export function Breadcrumbs() {
  const { segments } = useBoardPath();

  return (
    <BreadcrumbBase>
      <BreadcrumbItem>
        {segments.length === 1 ? (
          <span className="font-bold text-gray-600 dark:text-gray-300">{segments[0].segment || segments[0].title}</span>
        ) : (
          <Link {...segments[0].link}>{segments[0].segment || segments[0].title}</Link>
        )}
      </BreadcrumbItem>

      {segments.length > 3 && (
        <BreadcrumbItem>
          <Dropdown inline label="..." arrowIcon={false}>
            {segments.slice(1, -2).map((segment, idx) => (
              <Link key={idx} {...segment.link}>
                <DropdownItem>{segment.segment || segment.title}</DropdownItem>
              </Link>
            ))}
          </Dropdown>
        </BreadcrumbItem>
      )}

      {(segments.length > 3 ? segments.slice(-2) : segments.slice(1)).map((segment, idx, all) => (
        <BreadcrumbItem key={idx}>
          {idx === all.length - 1 ? (
            <span className="font-bold text-gray-600 dark:text-gray-300">{segment.segment || segment.title}</span>
          ) : (
            <Link {...segment.link}>{segment.segment || segment.title}</Link>
          )}
        </BreadcrumbItem>
      ))}
    </BreadcrumbBase>
  );
  /* Current Diagram View/Type/Name */
  /* <div className="text-xl font-medium text-gray-900 dark:text-gray-300 mt-2">{segments.at(-1)?.segment}</div> */
}
