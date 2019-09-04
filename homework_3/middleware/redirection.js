export default function (context) {

    console.log('path: ', context.route.path);

    if (context.route.path === '/') {
        context.redirect('/search/javascript')
    }
}
