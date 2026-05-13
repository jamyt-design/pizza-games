/**
 * Mounts a toolbar: games index link + page reload.
 * @param {object} [options]
 * @param {string} [options.gamesUrl='../index.html'] - href for the games list
 * @param {string} [options.gamesLabel='Games'] - visible label for the link
 * @param {string} [options.reloadLabel='Reload'] - visible label for reload
 * @param {string} [options.gamesAriaLabel] - optional aria-label on the link
 * @param {string} [options.reloadAriaLabel] - optional aria-label on reload
 * @param {'spread'|'viewport'} [options.layout='spread'] - spread = full row (games left, reload right); viewport = fixed corner
 * @param {boolean} [options.prepend=false] - insert as first child of mount target
 * @param {ParentNode|string|null} [options.mount=null] - append here; default document.body
 * @returns {HTMLElement} root .game-chrome element
 */
function mountGameChrome(options) {
    const opts = options || {};
    const gamesUrl = opts.gamesUrl != null ? opts.gamesUrl : '../index.html';
    const gamesLabel = opts.gamesLabel != null ? opts.gamesLabel : 'Games';
    const reloadLabel = opts.reloadLabel != null ? opts.reloadLabel : 'Reload';
    const gamesAria = opts.gamesAriaLabel || gamesLabel;
    const reloadAria = opts.reloadAriaLabel || reloadLabel;
    const layout = opts.layout === 'viewport' ? 'viewport' : 'spread';

    const root = document.createElement('div');
    root.className = 'game-chrome game-chrome--' + layout;
    root.setAttribute('role', 'toolbar');
    root.setAttribute('aria-label', opts.toolbarAriaLabel || 'Game menu');

    const link = document.createElement('a');
    link.className = 'game-chrome__link';
    link.href = gamesUrl;
    link.textContent = gamesLabel;
    link.setAttribute('aria-label', gamesAria);

    const reloadBtn = document.createElement('button');
    reloadBtn.type = 'button';
    reloadBtn.className = 'game-chrome__reload';
    reloadBtn.textContent = reloadLabel;
    reloadBtn.setAttribute('aria-label', reloadAria);
    reloadBtn.addEventListener('click', function () {
        window.location.reload();
    });

    root.appendChild(link);
    root.appendChild(reloadBtn);

    const parent =
        opts.mount == null
            ? document.body
            : typeof opts.mount === 'string'
              ? document.querySelector(opts.mount)
              : opts.mount;
    if (!parent) {
        throw new Error('mountGameChrome: mount target not found');
    }
    if (opts.prepend) {
        parent.insertBefore(root, parent.firstChild);
    } else {
        parent.appendChild(root);
    }

    return root;
}

window.mountGameChrome = mountGameChrome;
