import Link from 'next/link';
import { useRouter } from 'next/router';
import DoubleLeftIcon from './icons/DoubleLeft';

export interface BackLinkProps {
  to?: string;
  text?: string;
}

export default function BackLink(props: BackLinkProps) {
  const { to, text } = props;
  const router = useRouter();
  return (
    <h4 className="mt-2 text-sm sm:text-lg text-blue-600 dark:text-blue-400 font-medium flex items-center">
      <DoubleLeftIcon
        className="mr-1"
        onClick={() => {
          router.push(to || '/');
        }}
      />
      <Link href={to || '/'}>{text || '메인 페이지'}</Link>
    </h4>
  );
}
