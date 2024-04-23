import gql from "graphql-tag";

export const USERS_SELECT_QUERY = gql`
  query UsersSelect(
    $filter: UserFilter!
    $sorting: [UserSort!]
    $paging: OffsetPaging!
  ) {
    users(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        name
        avatarUrl
      }
    }
  }
`;

export const TASK_STAGES_SELECT_QUERY = gql`
  query TaskStagesSelect(
    $filter: TaskStageFilter!
    $sorting: [TaskStageSort!]
    $paging: OffsetPaging!
  ) {
    taskStages(filter: $filter, sorting: $sorting, paging: $paging) {
      totalCount
      nodes {
        id
        title
      }
    }
  }
`;
export const DASHBOARD_CALENDER_UPCOMING_EVENTS_QUERY = gql`
  query DashboardCalendarUpcomingEvents(
    $filter: EventFilter!
    $sorting:[EventSort!]
    $paging: OffsetPaging!

    ) {
    events(filter: $filter,sorting : $sorting,paging: $paging) {
      totalCount
      nodes {
        id
        title
        startDate
        endDate
        color
      }
    }
  }
`;



export const DASHBOARD_DEALS_CHART_QUERY = gql`
    query DashboardDealsChart(
        $filter: DealStageFilter!
        $sorting: [DealStageSort!]
        $paging: OffsetPaging!
    ) {
        dealStages(filter: $filter, sorting: $sorting, paging: $paging) {
            nodes {
                title
                dealsAggregate {
                    groupBy {
                        closeDateMonth
                        closeDateYear
                    }
                    sum {
                        value
                    }
                }
            }
        }
    }
`;
export const DASHBOARD_TOTAL_COUNTS_QUERY = gql`
    query DashboardTotalCounts {
        companies {
            totalCount
        }
        contacts {
            totalCount
        }
        deals {
            totalCount
        }
    }
`;
