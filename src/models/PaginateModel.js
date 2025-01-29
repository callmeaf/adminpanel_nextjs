import { arrayArtisan } from "@/helpers";

export default ({ data, meta, links }, dataModel) => ({
  data: data.map((item) => dataModel(item)),
  pagination: {
    links: {
      first: links.first,
      last: links.last,
      prev: links.prev,
      next: links.next,
    },
    meta: {
      currentPage: meta.current_page,
      from: meta.from,
      lastPage: meta.last_page,
      nextPage:
        meta.current_page == meta.last_page ? null : meta.current_page + 1,
      hasNextPage: function () {
        return !!this.nextPage;
      },
      path: meta.path,
      perPage: meta.per_page,
      to: meta.to,
      total: meta.total,
      links: meta.links.map((link) => ({
        url: link.url,
        label: link.label,
        active: link.active,
      })),
    },
  },
  mergeData: function (newData = []) {
    const { unique } = arrayArtisan();
    const updatedData = unique([...newData, ...this.data], "id");
    this.data = updatedData;

    return this;
  },
});
