import React from 'react';
import { ProjectProps } from './ProjectDisplay';
import Link from 'next/link';
import { CgExternal } from 'react-icons/cg';
import { HiArrowCircleUp, HiArrowNarrowUp, HiArrowUp } from 'react-icons/hi';

type Props = ProjectProps['info'];

export default function ProjectInfo(props: Props) {
  const { client, collaborators, discipline, sector,technologies, link } = props;
  return (
    <div className="flex max-w-sm flex-col gap-4 self-start md:sticky md:top-16 md:gap-8">
      <div>
        <h3 className="text-base font-medium">Client</h3>
        <p className="text-[max(1rem,1vw)]">{client}</p>
      </div>
      {sector && (
        <div>
          <h3 className="text-base font-medium">Sector</h3>
          <p className="text-[max(1rem,1vw)]">
            {sector.map((s) => s.title).join(', ')}
          </p>
        </div>
      )}
      {discipline && (
        <div>
          <h3 className="text-base font-medium">Discipline</h3>
          <p className="text-[max(1rem,1vw)]">
            {discipline.map((d) => d.title).join(', ')}
          </p>
        </div>
      )}
      {collaborators && (
        <div>
          <h3 className="text-base font-medium">Collaborators</h3>
          <p className="text-[max(1rem,1vw)]">
            {collaborators.map((c) => c.title).join(', ')}
          </p>
        </div>
      )}
        {technologies && (
        <div>
          <h3 className="text-base font-medium">Technologies</h3>
          <p className="text-[max(1rem,1vw)]">
            {technologies.map((c) => c.title).join(', ')}
          </p>
        </div>
      )}

      <div>
        {
        link && <Link href={link.url} target='_blank' className='text-base font-medium border p-2 px-4 rounded-full bg-black text-[#FFF]  hover:bg-[#fff] hover:text-black'>
           {link.title}
        </Link>
      }
      </div>
    </div>
  );
}
