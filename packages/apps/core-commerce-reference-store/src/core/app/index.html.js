/*
 ** Copyright (c) 2021 Oracle and/or its affiliates.
 */

/**
 * Add _additional_ `<meta>` tags to the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional meta HTML
 */
export const meta = (/*req, res*/) => {
  return ``;
};

/**
 * Add _additional_ PWA tags to the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional PWA HTML
 */
export const pwa = (/*req, res*/) => {
  return ``;
};

/**
 * Add _additional_ `<link>` tags to the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional link HTML
 */
export const link = (/*req, res*/) => {
  return `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap" rel="stylesheet">`;
  
};

/**
 * Add _additional_ style sheets to the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional style HTML
 */
export const style = (/*req, res*/) => {
  return ``;
};

/**
 * Add _additional_ `<script>` tags to the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional script HTML
 */
export const script = (/*req, res*/) => {
  return ``;
};

/**
 * Append HTML `<body>` of the `index.html`.
 *
 * @param {import('express').Request} req Current SSR request
 * @param {import('express').Response} res Current SSR response
 * @returns {String} Additional body HTML
 */
export const body = (/*req, res*/) => {
  return ``;
};
