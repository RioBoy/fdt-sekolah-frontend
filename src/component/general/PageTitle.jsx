import { memo } from 'react';

const PageTitle = memo(({ title = '', second = '' }) => {
  return (
    <>
      <h5
        className={
          'text-xl font-medium text-slate-500 ' + (second ? 'mb-2' : 'mb-0')
        }
      >
        {title}
      </h5>
      {second ? <p className="mb-0 pb-1">{second}</p> : null}
    </>
  );
});

export default PageTitle;
