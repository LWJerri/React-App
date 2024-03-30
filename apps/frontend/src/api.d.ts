/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/lists": {
    /**
     * Get all lists
     * @description This endpoint returns a list of all created lists.
     */
    get: operations["ListController_getLists"];
    /**
     * Create a list
     * @description This endpoint creates a new list in the database with the specified parameters and returns an object with the new list.
     */
    post: operations["ListController_createList"];
  };
  "/api/lists/{id}": {
    /**
     * Delete list
     * @description This endpoint deletes the list with all tasks bound to the list.
     */
    delete: operations["ListController_deleteList"];
    /**
     * Edit list
     * @description This endpoint accepts parameters to edit an existing list and returns a new list object.
     */
    patch: operations["ListController_patchList"];
  };
  "/api/lists/{listId}/tasks": {
    /**
     * Get the tasks
     * @description This endpoint will return a list of all created tasks for the specified list.
     */
    get: operations["TaskController_getTasks"];
    /**
     * Create a task
     * @description This endpoint accepts parameters to create a task and returns an object with the created task.
     */
    post: operations["TaskController_createTask"];
  };
  "/api/lists/{listId}/tasks/{id}/audit": {
    /**
     * History of changes
     * @description This endpoint will return a list of all changes that are associated with the specified task.
     */
    get: operations["TaskController_getAudit"];
  };
  "/api/lists/{listId}/tasks/{id}": {
    /**
     * Get the task
     * @description This endpoint will return an object with detailed information about a specific task.
     */
    get: operations["TaskController_getTask"];
    /**
     * Delete task
     * @description This endpoint removes the task from the database.
     */
    delete: operations["TaskController_deleteTask"];
    /**
     * Edit task
     * @description This endpoint accepts parameters to edit an existing task and returns a new object.
     */
    patch: operations["TaskController_patchTask"];
  };
  "/api/audit": {
    /**
     * Global audit log
     * @description This request will return the entire history of actions on lists and tasks.
     */
    get: operations["AuditController_getAudit"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    ResponseListWithTaskFieldDto: {
      /**
       * @description Unique Id of the record in the database
       * @example clu1pl3ku000508jxh4p5hqrw
       */
      id: string;
      /**
       * @description Title for the list.
       * @example Triage
       */
      name: string;
      /**
       * Format: date-time
       * @description Date the list was created.
       * @example 2024-03-30T12:37:22.673Z
       */
      createdAt: string;
      /**
       * Format: date-time
       * @description Date the list was updated.
       * @example 2024-03-30T12:37:22.674Z
       */
      updatedAt: string;
      /**
       * @description How many tasks does this list have.
       * @example 1
       */
      task: number;
    };
    FallbackResponse: {
      /**
       * @description Error in numeric format.
       * @example 404
       */
      statusCode: number;
      /** @description Detailed description of the error. */
      message: string | string[];
      /**
       * @description Brief description of the error.
       * @example Not Found
       */
      error?: string;
    };
    CreateListDto: {
      /**
       * @description Title for the list.
       * @example Triage
       */
      name: string;
    };
    ResponseListDto: {
      /**
       * @description Unique Id of the record in the database
       * @example clu1pl3ku000508jxh4p5hqrw
       */
      id: string;
      /**
       * @description Title for the list.
       * @example Triage
       */
      name: string;
      /**
       * Format: date-time
       * @description Date the list was created.
       * @example 2024-03-30T12:37:22.673Z
       */
      createdAt: string;
      /**
       * Format: date-time
       * @description Date the list was updated.
       * @example 2024-03-30T12:37:22.674Z
       */
      updatedAt: string;
    };
    PatchListDto: {
      /**
       * @description Title for the list.
       * @example Triage
       */
      name: string;
    };
    ResponseTaskDto: {
      /**
       * @description Unique Id of the record in the database
       * @example clu1q2t4h000308l02jl2d8ze
       */
      id: string;
      /**
       * @description Title for the task.
       * @example My awesome task
       */
      name: string;
      /**
       * @description Detailed description for the task.
       * @example Lorem Ipsum is simply dummy text of the printing and typesetting industry.
       */
      description: string;
      /**
       * Format: date-time
       * @description The time by which the task must be completed.
       * @example 2024-03-30T12:37:22.675Z
       */
      dueAt: string;
      /**
       * @description Prioritization of task performance.
       * @example NORMAL
       * @enum {string}
       */
      priority: "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
      /**
       * Format: date-time
       * @description Date the task was created.
       * @example 2024-03-30T12:37:22.675Z
       */
      createdAt: string;
      /**
       * Format: date-time
       * @description Date the task was updated.
       * @example 2024-03-30T12:37:22.675Z
       */
      updatedAt: string;
      /**
       * @description The unique Id of the list to which the task is bound.
       * @example clu1q5lg9000408l010be3hld
       */
      listId: string;
    };
    ResponseAuditTaskDto: {
      /**
       * @description What kind of action took place.
       * @example CREATE
       * @enum {string}
       */
      action: "CREATE" | "EDIT" | "DELETE";
      /**
       * @description The model that was acted upon.
       * @example TASK
       * @enum {string}
       */
      relatedModel: "LIST" | "TASK";
      /**
       * @description What exactly was changed in the record.
       * @example name
       */
      affectedField: string;
      /**
       * Format: date-time
       * @description The date on which the action was performed.
       * @example 2024-03-30T12:37:22.676Z
       */
      createdAt: string;
      /** @description The new state of the object. */
      newState: components["schemas"]["ResponseTaskDto"];
      /** @description The old state of the object. */
      oldState: components["schemas"]["ResponseTaskDto"];
    };
    CreateTaskDto: {
      /**
       * @description Title for the task.
       * @example My awesome task 💖
       */
      name: string;
      /**
       * @description Detailed description for the task.
       * @example Lorem Ipsum is simply dummy text of the printing and typesetting industry.
       */
      description: string;
      /**
       * @description The time by which the task must be completed.
       * @example 2024-03-30T12:37:22.795Z
       */
      dueAt: string;
      /**
       * @description Prioritization of task performance.
       * @example NORMAL
       * @enum {string}
       */
      priority: "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
    };
    PatchTaskDto: {
      /**
       * @description Title for the task.
       * @example My awesome task 💖
       */
      name?: string;
      /**
       * @description Detailed description for the task.
       * @example Lorem Ipsum is simply dummy text of the printing and typesetting industry.
       */
      description?: string;
      /**
       * @description The time by which the task must be completed.
       * @example 2024-03-30T12:37:22.795Z
       */
      dueAt?: string;
      /**
       * @description Prioritization of task performance.
       * @example NORMAL
       * @enum {string}
       */
      priority?: "LOW" | "NORMAL" | "HIGH" | "CRITICAL";
      /**
       * @description The new Id of the list where the task will be moved to.
       * @example clu1q1fu9000208l02homh3in
       */
      listId?: string;
    };
    ResponseAuditDto: {
      /**
       * @description What kind of action took place.
       * @example CREATE
       * @enum {string}
       */
      action: "CREATE" | "EDIT" | "DELETE";
      /**
       * @description The model that was acted upon.
       * @example TASK
       * @enum {string}
       */
      relatedModel: "LIST" | "TASK";
      /**
       * @description What exactly was changed in the record.
       * @example name
       */
      affectedField: string;
      /**
       * Format: date-time
       * @description The date on which the action was performed.
       * @example 2024-03-30T12:37:22.676Z
       */
      createdAt: string;
      /** @description The new state of the object. */
      newState: components["schemas"]["ResponseListDto"] | components["schemas"]["ResponseTaskDto"];
      /** @description The old state of the object. */
      oldState: components["schemas"]["ResponseListDto"] | components["schemas"]["ResponseTaskDto"];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {
  /**
   * Get all lists
   * @description This endpoint returns a list of all created lists.
   */
  ListController_getLists: {
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseListWithTaskFieldDto"][];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
  /**
   * Create a list
   * @description This endpoint creates a new list in the database with the specified parameters and returns an object with the new list.
   */
  ListController_createList: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateListDto"];
      };
    };
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseListDto"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
  /**
   * Delete list
   * @description This endpoint deletes the list with all tasks bound to the list.
   */
  ListController_deleteList: {
    parameters: {
      path: {
        /**
         * @description Specify the Id of the list to be deleted.
         * @example clu1pxcl2000108l06gqlbot3
         */
        id: string;
      };
    };
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: never;
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
  /**
   * Edit list
   * @description This endpoint accepts parameters to edit an existing list and returns a new list object.
   */
  ListController_patchList: {
    parameters: {
      path: {
        /**
         * @description Specify the Id of the list to be edited.
         * @example clu1pvhrh000008l09t6j7aen
         */
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PatchListDto"];
      };
    };
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseListDto"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
  /**
   * Get the tasks
   * @description This endpoint will return a list of all created tasks for the specified list.
   */
  TaskController_getTasks: {
    parameters: {
      path: {
        /**
         * @description Specify the Id of the list for which you want to retrieve tasks.
         * @example clu1q9zal000508l0cmq7b24e
         */
        listId: string;
      };
    };
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseTaskDto"][];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
  /**
   * Create a task
   * @description This endpoint accepts parameters to create a task and returns an object with the created task.
   */
  TaskController_createTask: {
    parameters: {
      path: {
        /**
         * @description Specify the Id of the list to which the task will be attached.
         * @example clu1qf8l4000808l037zq5ohy
         */
        listId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateTaskDto"];
      };
    };
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseTaskDto"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
  /**
   * History of changes
   * @description This endpoint will return a list of all changes that are associated with the specified task.
   */
  TaskController_getAudit: {
    parameters: {
      path: {
        /**
         * @description Specify the Id of the task for which you want to retrieve the history.
         * @example clu1qbwq6000608l016lme5b0
         */
        id: string;
      };
    };
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseAuditTaskDto"][];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
  /**
   * Get the task
   * @description This endpoint will return an object with detailed information about a specific task.
   */
  TaskController_getTask: {
    parameters: {
      path: {
        /**
         * @description Specify the Id of the task for which you want to retrieve the history.
         * @example clu1qdgea000708l097xq1jb9
         */
        id: string;
      };
    };
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseTaskDto"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
  /**
   * Delete task
   * @description This endpoint removes the task from the database.
   */
  TaskController_deleteTask: {
    parameters: {
      path: {
        /**
         * @description Specify the Id of the task to be deleted.
         * @example clu1qiv97000a08l0e1185dzw
         */
        id: string;
      };
    };
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: never;
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
  /**
   * Edit task
   * @description This endpoint accepts parameters to edit an existing task and returns a new object.
   */
  TaskController_patchTask: {
    parameters: {
      path: {
        /**
         * @description Specify the Id of the task for which you want to modify.
         * @example clu1qhhuj000908l0bt4j5u3l
         */
        id: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PatchTaskDto"];
      };
    };
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseTaskDto"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
  /**
   * Global audit log
   * @description This request will return the entire history of actions on lists and tasks.
   */
  AuditController_getAudit: {
    responses: {
      /** @description Response when the request is successfully processed. */
      200: {
        content: {
          "application/json": components["schemas"]["ResponseAuditDto"][];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      400: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
      /** @description Response if an error occurs while processing a request. */
      500: {
        content: {
          "application/json": components["schemas"]["FallbackResponse"];
        };
      };
    };
  };
}