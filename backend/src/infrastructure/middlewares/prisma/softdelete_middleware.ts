import { prisma } from "../../database/prisma"

const SoftDeleteMiddleware = () => {
  /***********************************/
  /* SOFT DELETE MIDDLEWARE */
  /***********************************/
  prisma.$use(async (params, next) => {
    if (params.action === 'findUnique' || params.action === 'findFirst') {
      params.action = 'findFirst'
      params.args.where['deletedAt'] = null
    }
    if (params.action === 'findMany') {
      if (params.args?.where) {
        if (params.args.where.deletedAt === undefined) {
          params.args.where['deletedAt'] = null
        }
      } else {
        if(params.args === undefined) {
          params.args = {
            where: { deletedAt: null }
          }
        } else {
          params.args['where'] = { deletedAt: null }
        }
      }
    }

    return next(params)
  })

  prisma.$use(async (params, next) => {
    if (params.action === 'update') {
      params.action = 'updateMany'
      params.args.where['deletedAt'] = null
    }
    if (params.action === 'updateMany') {
      if (params.args?.where !== undefined) {
        params.args.where['deletedAt'] = null
      } else {
        params.args['where'] = { deletedAt: null }
      }
    }

    return next(params)
  })

  prisma.$use(async (params, next) => {
    if (params.action === 'delete') {
      params.action = 'update'
      params.args['data'] = { deletedAt: new Date().toISOString() }
    }
    if (params.action === 'deleteMany') {
      // Delete many queries
      params.action = 'updateMany'
      if (params.args?.data !== undefined) {
        params.args.data['deletedAt'] = new Date().toISOString()
      } else {
        params.args['data'] = { deletedAt: new Date().toISOString() }
      }
    }

    return next(params)
  })
}

export default SoftDeleteMiddleware