import type { ReactNode } from 'react';


type IMainProps = {
  meta?: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => {
  const { meta, children } = props;

  return (
    <div className="w-full bg-white text-gray-900 antialiased">
      {meta && meta}

      <main className="text-base">{children}</main>
    </div>
  );
};

export { Main };
