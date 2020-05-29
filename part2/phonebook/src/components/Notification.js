import React from 'react'

export default function Notification({ message, type }) {
  return message.length ? (
    <p className={type}>{message}</p>
  ) : null;
};
