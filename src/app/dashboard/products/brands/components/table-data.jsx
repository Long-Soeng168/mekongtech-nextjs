import React from "react";
import Image from "next/image";
import ViewButton from "./view-button";
import DeleteButton from "./delete-button";
import EditButton from "./edit-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CATEGORY_IMAGE_URL } from "@/config/env";
import moment from "moment";
import MyNoDataIcon from "@/components/my-no-data-icon";
import MyPagination from "@/components/my-pagination";
import MyNoImage from "@/components/my-no-image";
import { fetchBrands } from "@/service/brands-service";

const TableData = async ({ search, page, sort_by, parent_code, status }) => {
  const result = await fetchBrands({
    search: search,
    page: page,
    sort_by: sort_by,
    parent_code: parent_code,
    status: status,
  });
  const brands = result.data;
  const links = result.links;
  const from = result.from;
  const to = result.to;
  const total = result.total;
  const last_page = result.last_page;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="whitespace-nowrap">
            <TableHead className="w-[50px]">No</TableHead>
            <TableHead className="text-left">Action</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Title Khmer</TableHead>
            <TableHead>Order Index</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Updated By</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brands?.length > 0 ? (
            brands.map((brand, index) => (
              <TableRow key={brand.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>
                  <span className="flex items-center justify-start h-full">
                    <ViewButton />
                    <DeleteButton id={brand.id} />
                    <EditButton id={brand.id} />
                  </span>
                </TableCell>
                <TableCell>
                  {brand.image ? (
                    <Image
                      src={CATEGORY_IMAGE_URL + brand.image}
                      width={100}
                      height={100}
                      alt=""
                      className="w-10 aspect-square object-contain"
                    />
                  ) : (
                    <MyNoImage iconWidth="w-10" />
                  )}
                </TableCell>
                <TableCell>{brand.code || "---"}</TableCell>
                <TableCell>{brand.title || "---"}</TableCell>
                <TableCell>{brand.title_kh || "---"}</TableCell>
                <TableCell>{brand.order_index || "---"}</TableCell>
                <TableCell>
                  {moment(brand.created_at).format("D-MMM-YYYY")}
                </TableCell>
                <TableCell>---</TableCell>
                <TableCell>
                  {moment(brand.updated_at).format("D-MMM-YYYY")}
                </TableCell>
                <TableCell>---</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={13}>
                <MyNoDataIcon />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <MyPagination
        links={links}
        from={from}
        to={to}
        total={total}
        last_page={last_page}
      />
    </>
  );
};

export default TableData;
