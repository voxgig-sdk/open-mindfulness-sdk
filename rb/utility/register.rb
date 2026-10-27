# OpenMindfulness SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OpenMindfulnessUtility.registrar = ->(u) {
  u.clean = OpenMindfulnessUtilities::Clean
  u.clean_add = OpenMindfulnessUtilities::CleanAdd
  u.clean_explain = OpenMindfulnessUtilities::CleanExplain
  u.done = OpenMindfulnessUtilities::Done
  u.make_error = OpenMindfulnessUtilities::MakeError
  u.feature_add = OpenMindfulnessUtilities::FeatureAdd
  u.feature_hook = OpenMindfulnessUtilities::FeatureHook
  u.feature_init = OpenMindfulnessUtilities::FeatureInit
  u.fetcher = OpenMindfulnessUtilities::Fetcher
  u.make_fetch_def = OpenMindfulnessUtilities::MakeFetchDef
  u.make_context = OpenMindfulnessUtilities::MakeContext
  u.make_options = OpenMindfulnessUtilities::MakeOptions
  u.make_request = OpenMindfulnessUtilities::MakeRequest
  u.make_response = OpenMindfulnessUtilities::MakeResponse
  u.make_result = OpenMindfulnessUtilities::MakeResult
  u.make_point = OpenMindfulnessUtilities::MakePoint
  u.make_spec = OpenMindfulnessUtilities::MakeSpec
  u.make_url = OpenMindfulnessUtilities::MakeUrl
  u.param = OpenMindfulnessUtilities::Param
  u.prepare_auth = OpenMindfulnessUtilities::PrepareAuth
  u.prepare_body = OpenMindfulnessUtilities::PrepareBody
  u.prepare_headers = OpenMindfulnessUtilities::PrepareHeaders
  u.prepare_method = OpenMindfulnessUtilities::PrepareMethod
  u.prepare_params = OpenMindfulnessUtilities::PrepareParams
  u.prepare_path = OpenMindfulnessUtilities::PreparePath
  u.prepare_query = OpenMindfulnessUtilities::PrepareQuery
  u.graphql_body = OpenMindfulnessUtilities::GraphqlBody
  u.graphql_errors = OpenMindfulnessUtilities::GraphqlErrors
  u.result_basic = OpenMindfulnessUtilities::ResultBasic
  u.result_body = OpenMindfulnessUtilities::ResultBody
  u.result_headers = OpenMindfulnessUtilities::ResultHeaders
  u.transform_request = OpenMindfulnessUtilities::TransformRequest
  u.transform_response = OpenMindfulnessUtilities::TransformResponse
}
