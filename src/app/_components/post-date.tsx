import React from 'react';

interface PostDateProps {
  dateString: string;
}

export default function PostDate({ dateString }: PostDateProps) {
  const date: Date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);
  return <time dateTime={dateString}>{formattedDate}</time>;
}