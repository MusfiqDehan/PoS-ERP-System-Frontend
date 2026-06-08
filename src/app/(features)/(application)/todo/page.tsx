"use client";

import { useState } from "react";
import TodoModal from "@/core/modals/todoModal";
import HighPriorityAccordion from "@/components/Todo/HighPriorityAccordion";
import HighPriorityTab from "@/components/Todo/HighPriorityTab";
import LoadMoreButton from "@/components/Todo/LoadMoreButton";
import LowPriorityAccordion from "@/components/Todo/LowPriorityAccordion";
import LowPriorityTab from "@/components/Todo/LowPriorityTab";
import MediumPriorityAccordion from "@/components/Todo/MediumPriorityAccordion";
import MediumPriorityTab from "@/components/Todo/MediumPriorityTab";
import NewTaskButton from "@/components/Todo/NewTaskButton";
import PageHeader from "@/components/Todo/PageHeader";
import TodoFilters from "@/components/Todo/TodoFilters";
import TodoFooter from "@/components/Todo/TodoFooter";
import TodoStatsRow from "@/components/Todo/TodoStatsRow";

export default function Todo() {
  const [, setIsTodo] = useState([false, false, false]);

  const toggleTodo = (index: number) => {
    setIsTodo((prevIsTodo) => {
      const newIsTodo = [...prevIsTodo];
      newIsTodo[index] = !newIsTodo[index];
      return newIsTodo;
    });
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <PageHeader />
          <div className="card">
            <div className="card-body">
              <TodoStatsRow />
              <NewTaskButton />
              <TodoFilters />
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-home"
                  role="tabpanel"
                >
                  <div
                    className="accordion todo-accordion"
                    id="accordionExample"
                  >
                    <HighPriorityAccordion onToggleTodo={toggleTodo} />
                    <MediumPriorityAccordion />
                    <LowPriorityAccordion />
                  </div>
                </div>
                <HighPriorityTab />
                <MediumPriorityTab />
                <LowPriorityTab />
              </div>
              <LoadMoreButton />
            </div>
          </div>
        </div>
        <TodoFooter />
      </div>
      <TodoModal />
    </>
  );
}
