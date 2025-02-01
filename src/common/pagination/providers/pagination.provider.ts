import { Inject, Injectable, Logger } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Paginated } from '../interfaces/paginated.interface';
import { buildPaginationUrl } from 'src/common/helpers/url-builder.helper';

@Injectable()
export class PaginationProvider {
  constructor(
    private readonly logger: Logger,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {
    this.logger = new Logger(PaginationProvider.name);
  }
  async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const { limit, page } = paginationQuery;
    const results = await repository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
    /**
     * Create the reques URLS
     */
    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';
    const newUrl = new URL(this.request.url, baseURL);

    /**
     * Calculating page number
     */
    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / limit);
    const nextPage = page === totalPages ? page : page + 1;
    const previousPage = page === 1 ? page : page - 1;

    /**
     * Creating the URLS
     */
    const firstPageUrl = buildPaginationUrl(
      newUrl.origin,
      newUrl.pathname,
      limit,
      1,
    );
    const lastPageUrl = buildPaginationUrl(
      newUrl.origin,
      newUrl.pathname,
      limit,
      totalPages,
    );
    const currentPageUrl = buildPaginationUrl(
      newUrl.origin,
      newUrl.pathname,
      limit,
      page,
    );
    const nextPageUrl = buildPaginationUrl(
      newUrl.origin,
      newUrl.pathname,
      limit,
      nextPage,
    );
    const previousPageUrl = buildPaginationUrl(
      newUrl.origin,
      newUrl.pathname,
      limit,
      previousPage,
    );

    const finalResponse: Paginated<T> = {
      data: results,
      meta: {
        itemsPerPage: limit,
        totalItems,
        currentPage: page,
        totalPages,
      },
      links: {
        first: firstPageUrl,
        last: lastPageUrl,
        current: currentPageUrl,
        next: nextPageUrl,
        previous: previousPageUrl,
      },
    };
    return finalResponse;
  }
}
