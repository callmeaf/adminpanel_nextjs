export default ({
                    data,
                    meta,
                    links,
                }, dataModel) => ({
    data: data.map(item => dataModel(item)),
    links: {
        first: links.first,
        last: links.last,
        prev: links.prev,
        next: links.next,
    },
    meta: {
        currenctPage: meta.current_page,
        from: meta.from,
        lastPage: meta.last_page,
        path: meta.path,
        perPage: meta.per_page,
        to: meta.to,
        total: meta.total,
        links: meta.links.map(link => ({
            url: link.url,
            label: link.label,
            active: link.active,
        })),
    },
})