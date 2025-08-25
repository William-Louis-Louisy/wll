"use client";
import { GithubLogo, Globe, LinkedinLogo } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

interface CardContentProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  github?: string;
  website?: string;
  linkedin?: string;
}

export default function CardContent({
  name,
  title,
  email,
  phone,
  github,
  website,
  linkedin,
}: CardContentProps) {
  const picture =
    "https://ucarecdn.com/b29bf956-719d-4fc6-96de-4e8d71fccbbe/-/preview/1000x1000/";
  return (
    <div>
      {/* Top section */}
      <span className="absolute inset-0 rounded-t-xl w-full h-[35%] z-99 isometric-bg">
        <span className="absolute right-6 bottom-3 text-xl font-bold text-white">
          {name}
        </span>
      </span>
      {/* Picture */}
      <span className="absolute z-99">
        <Image
          src={picture}
          width={112}
          height={112}
          alt="Picture of the author"
          className="rounded-full transform scale-100 hover:scale-105 transition-all duration-100 ease-out shadow-[0_4px_9px_rgba(0,0,0,0.2)]"
        />
      </span>
      {/* Bottom section */}
      <span className="absolute left-0 top-[35%] w-full h-[65%] pt-3">
        <span className="absolute right-6 flex flex-col items-end gap-1">
          <span className="font-bold">{title}</span>
          <Link
            href={email}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline hover:underline-offset-2 duration-300"
          >
            {email}
          </Link>
          <Link
            href={phone}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm hover:underline hover:underline-offset-2 duration-300"
          >
            {phone}
          </Link>
        </span>
      </span>

      {/* Socials & links */}
      <span className="absolute bottom-3 inline-flex items-center gap-1">
        {website && (
          <Link
            title="Website"
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-black/10 hover:bg-black/30 rounded-full"
          >
            <Globe size={18} />
          </Link>
        )}
        {github && (
          <Link
            title="Github"
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-black/10 hover:bg-black/30 rounded-full"
          >
            <GithubLogo size={18} />
          </Link>
        )}
        {linkedin && (
          <Link
            title="Linkedin"
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-black/10 hover:bg-black/30 rounded-full"
          >
            <LinkedinLogo size={18} />
          </Link>
        )}
      </span>
    </div>
  );
}
