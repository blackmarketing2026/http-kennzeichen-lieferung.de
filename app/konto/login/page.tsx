import { LoginForm } from '@/components/konto/login-form';

export default async function KontoLoginPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const expired = Boolean(params.error);
  return <LoginForm expiredNotice={expired} />;
}
